import { NextResponse, type NextRequest } from "next/server";
import { pinata } from "@/config";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    // const info = await pinata.groups.create({
    //   name: "job-board",
    // });
    // console.log({ info });

    const uploadData = await pinata.upload.file(file, {
      groupId: "bfcf2139-c86b-4c40-b1d3-86d9cbec34b4",
    });

    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${uploadData.IpfsHash}`;

    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
