import { connectDb } from "@/lib/mongodb";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        await connectDb();
        const {email} = await req.json();
        const user = await UserModel.findOne({email}).select("_id");
        return NextResponse.json({user})
    } catch(error){
        console.log(error)
    }
}