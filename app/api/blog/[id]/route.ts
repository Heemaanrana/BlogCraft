import { connectDb } from '@/lib/mongodb';
import { BlogModel } from '@/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// GET blog by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Optimized connection check
    if (mongoose.connections[0].readyState !== 1) {
      await connectDb();
    }

    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    const blog = await BlogModel.findById(id).lean();

    if (!blog || Object.keys(blog).length === 0) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    const response = NextResponse.json(blog, { status: 200 });
    // Security headers
    response.headers.set('Cache-Control', 'no-store');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    return response;

  } catch (error) {
    console.error('GET /api/blog/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}