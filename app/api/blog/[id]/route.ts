import { connectDb } from '@/lib/mongodb';
import { BlogModel } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET blog by ID using query parameters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Check if ID exists in query params
    if (!id) {
      return NextResponse.json(
        { error: 'Missing blog ID in query parameters' },
        { status: 400 }
      );
    }

    await connectDb();

    // Validate MongoDB ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}