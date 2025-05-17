// app/api/posts/route.ts
import { connectDb } from '@/lib/mongodb';
import { BlogModel } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';




// allblog api

export async function GET(){
  
  try{
    await connectDb();

    const blogs = await BlogModel.find().sort({ date: -1 });

    return NextResponse.json(blogs, {status: 200});
  } catch(error) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

// post api

export async function POST(req: NextRequest){
  try{
    await connectDb();
    const body: BlogPost = await req.json();

    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPost = new BlogModel({
      title,
      content,
      author,
    });

    const savedPost = await newPost.save();

    return NextResponse.json(savedPost, { status: 201 });
  }  catch (error) {
    console.error('POST /api/blog error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}