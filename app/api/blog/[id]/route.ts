import { connectDb } from '@/lib/mongodb';
import { BlogModel } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET blog by ID
export async function GET(
  req: NextRequest, context: { params: { id: string } }
) {
  try {
    await connectDb();

    const { id } = context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('GET /api/blog/[id] error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
