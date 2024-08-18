import { NextResponse } from "next/server";

export async function GET(Request) {
  const { searchParams } = new URL(Request.url);
  const searchText = searchParams.get("q");
  try {
    // const token =
    //   "pk.eyJ1IjoidWxhZGJvaGRhbiIsImEiOiJjam9kMDQ1NzYxOTYyM3FvanhpOXE1cDIzIn0.JiXb8lR9e53GqZz51PZdaQ";
    //const BaseUrl = "https://api.mapbox.com/search/searchbox/v1/suggest?q=";

    const res = await fetch(
      "https://api.mapbox.com/search/searchbox/v1/suggest?q=" +
        searchText +
        "&language=en&limit=5&session_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN +
        "&proximity=-83.748708,42.265837&country=US&access_token=" +
        process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN +
        "",
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const searchResult = await res.json();
    return NextResponse.json(searchResult);
  } catch (err) {
    //console.log(err);
  }

  return NextResponse.json(searchResult);
}
