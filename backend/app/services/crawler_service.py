import aiohttp
from bs4 import BeautifulSoup
from typing import Dict
from app.core.exceptions import CrawlError
import time


DEFAULT_HEADERS: Dict = {"User-Agent": "SiteSageBot/1.0 (+https://sitesage.local)"}


async def crawl_url(url: str):
    try:
        async with aiohttp.ClientSession(headers=DEFAULT_HEADERS) as session:
            start_time = time.perf_counter()
            async with session.get(url, timeout=15) as response:
                if response.status != 200:
                    raise CrawlError(raised_by="app/services.crawl")
                ttfb_ms = (time.perf_counter() - start_time) * 1000
                html = await response.text()
                total_time_ms = (time.perf_counter() - start_time) * 1000
                page_size_kb = len(html.encode("utf-8")) / 1024
    except CrawlError:
        raise
    except Exception as e:
        raise e
    soup = BeautifulSoup(html, "html.parser")

    title_tag = soup.title.string.strip() if soup.title and soup.title.string else None

    meta_description_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = (
        meta_description_tag.get("content").strip()
        if meta_description_tag and meta_description_tag.get("content")
        else None
    )

    h1_tags = [h.get_text(strip=True) for h in soup.find_all("h1")]
    h2_tags = [h.get_text(strip=True) for h in soup.find_all("h2")]

    images = soup.find_all("img")
    images_missing_alt = [
        img for img in images if not img.get("alt") or not img.get("alt").strip()
    ]

    return {
        "title": title_tag,
        "meta_description": meta_description,
        "h1_count": len(h1_tags),
        "h2_count": len(h2_tags),
        "images_total": len(images),
        "images_missing_alt": len(images_missing_alt),
        "performance": {
            "response_time_ms": round(total_time_ms, 2),
            "ttfb_ms": round(ttfb_ms, 2),
            "page_size_kb": round(page_size_kb, 2),
        },
    }
