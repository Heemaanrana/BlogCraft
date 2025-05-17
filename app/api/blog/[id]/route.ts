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
    // Get ID first (await it for dynamic routes)
    const id = await params.id; // <-- Key fix here

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID format' },
        { status: 400 }
      );
    }

    // Connect to DB only if needed
    if (mongoose.connections[0].readyState !== 1) {
      await connectDb();
    }

    // Find blog with lean for performance
    const blog = await BlogModel.findById(id).lean();

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Secure response
    const response = NextResponse.json(blog, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;

  } catch (error) {
    console.error('GET /api/blog/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}