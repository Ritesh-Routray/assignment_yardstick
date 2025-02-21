import { connectDB } from "@/app/lib/mongodb";
import Transaction from "@/app/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req) {
  await connectDB();
  const { amount, date, description } = await req.json();
  const transaction = new Transaction({ amount, date, description });
  await transaction.save();
  return NextResponse.json(transaction, { status: 201 });
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
