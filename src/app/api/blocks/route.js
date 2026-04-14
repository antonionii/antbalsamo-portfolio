import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';


export async function POST(req) {
  const { password } = await req.json();
    const PROJECT_PASSWORD = process.env.PROJECT_PASSWORD; 

  if (password === PROJECT_PASSWORD) {
    // Optionally, set a cookie or JWT here for session persistence
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, message: 'Incorrect password' }, { status: 401 });
}
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getPageMetadata = async (pageId) => {
  try {
    console.log('Fetching page metadata for:', pageId);
    const response = await notion.pages.retrieve({ page_id: pageId });
    console.log('Page metadata response:', response);
    // Safely access the title field with error handling
    const titleProperty = response.properties?.Project?.title;
    const title = titleProperty && titleProperty.length > 0 ? titleProperty[0].text.content : 'Untitled';

    return {
      title,  // Use the title or 'Untitled'
      coverImage: response.cover?.external?.url || response.cover?.file?.url,
      icon: response.icon?.emoji || null,
       properties: response.properties
      // createdTime: response?.created_time,
      // lastEditedTime: response?.last_edited_time
    };
  } catch (error) {
    console.error('Error fetching page metadata:', error);
    throw error;
  }
};

const getChildBlock = async (blockId) => {
  try {
    const response = await notion.blocks.children.list({ block_id: blockId });
    console.log('Block children response:', response);
    const childBlock = await Promise.all(
      response.results.map(async (block) => {
        if (block.has_children) {
          const children = await getChildBlock(block.id);
          return { ...block, children };
        }
        return block;
      })
    );
    return childBlock;
  } catch (error) {
    console.error('Error fetching block data:', error);
    throw error;
  }
};

export async function GET(req) {
   //const pageId = 'a8fe00e4af834fd9a82b97606ef882df'; 
const { searchParams } = new URL(req.url);
const pageId = searchParams.get('pageId');

if (!pageId) {
  return NextResponse.json({ error: 'pageId is needed'}, { status: 400 });
}
  try {
    const [metadata, blocks] = await Promise.all([
      getPageMetadata(pageId),
      getChildBlock(pageId)
    ]);

    return NextResponse.json({ metadata, blocks }, { status: 200 });
  } catch (error) {
    console.error('Error in GET route:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Notion' }, { status: 500 });
  }
}