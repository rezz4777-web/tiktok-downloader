import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL tidak boleh kosong" }, { status: 400 });
    }

    // Menggunakan API alternatif (TikWM) yang biasanya lebih stabil
    const apiRes = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await apiRes.json();

    // Log ke terminal VS Code untuk memantau apa yang terjadi
    console.log("Respon dari API TikTok:", data);

    if (data.data) {
      return NextResponse.json({
        success: true,
        title: data.data.title,
        author: data.data.author.nickname,
        cover: data.data.cover,
        videoUrl: data.data.play, // Link video no watermark
      });
    } else {
      return NextResponse.json(
        { error: "API tidak memberikan data. Coba link video lain." },
        { status: 500 }
      );
    }
  } catch (error) {
    // Pesan error ini akan muncul di Terminal VS Code Anda (bukan di browser)
    console.error("DETEKSI ERROR SERVER:", error.message);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal: " + error.message },
      { status: 500 }
    );
  }
}