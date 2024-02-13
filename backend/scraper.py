from bs4 import BeautifulSoup
import requests
import re


def search_movie_ev01(movie_title_s):
    formatted_name = movie_title_s.replace(' ', '-')
    url = f'https://ev01.sx/search/{formatted_name}'
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')

    movie_info_list = []
    movie_elements = soup.select('div.flw-item')
    if movie_elements:
        link_elements = soup.select('div.film-detail h2.film-name a')
        movie_i = soup.select('div.film-detail div.film-infor')
        poster_i = soup.select('div.film-poster')
        if link_elements and movie_i:
            for link, movie, poster in zip(link_elements, movie_i, poster_i):
                movie_link = f'https://ev01.sx/{link.get("href")}'
                title = link.get("title")
                quality = movie.select_one("span.fi-ql").text
                year = movie.select_one("span:nth-of-type(2)").text
                duration = movie.select_one("span:nth-of-type(3)").text
                poster = poster.select_one("img").get("data-src")
                movie_info = {
                    'title': title,
                    'link': movie_link,
                    'quality': quality,
                    'year': year,
                    'duration': duration,
                    'poster': poster,
                }
                movie_info_list.append(movie_info)
        else:
            print("Nie znaleziono linku do podanego filmu")

    return movie_info_list


def search_movie_europix(movie_title_s):
    url = f'https://europixhd.stream/?s={movie_title_s}'
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')

    movie_info_list = []

    movie_elements = soup.select('body > center')
    if movie_elements:
        link_elements = soup.select('figure')
        movie_i = soup.select('figure figcaption')
        if link_elements and movie_i:
            for link, movie in zip(link_elements, movie_i):
                movie_link = link.select_one('a').get('href')
                title = movie.select_one("h3:nth-of-type(1)").text
                match = re.search(r'\(([^)]+)\)', title)
                year = match.group(1) if match else None
                quality = link.select_one("span").text
                poster_1 = link.select_one("img").get("data-src")
                poster = f'https:{poster_1}'

                movie_info = {
                    'title': re.sub(r'\(\d{4}\)', '', title).strip(),
                    'link': movie_link,
                    'year': year,
                    'poster': poster,
                    'quality': quality,
                }
                movie_info_list.append(movie_info)
        else:
            print("Nie znaleziono linku do podanego filmu")

        return movie_info_list


def search_rt(movie_name):
    formatted_name = movie_name.replace(' ', '%20')
    url = f'https://www.rottentomatoes.com/search?search={formatted_name}'
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')
    list1 = soup.select('#search-results > search-page-result[type="movie"] > ul')
    list2 = soup.select('#search-results > search-page-result[type="tvSeries"] > ul')

    # combined_list = []
    # combined_list.extend(list1)
    # combined_list.extend(list2)
    movie_info_list = []

    for movie in list1:
        link_to_movie_page = movie.find('a', class_='unset').get('href')
        print(link_to_movie_page)
        title_el = movie.select_one('search-page-media-row:nth-child(1) > a:nth-child(2)')
        title = title_el.text.strip() if title_el else 'Not found'
        poster_jpg = movie.find('img').get('src')

        if link_to_movie_page:
            response = requests.get(link_to_movie_page)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')

                info_element = soup.select_one('#scoreboard > p').text
                year = info_element[:4]
                description_element = soup.select_one('#movie-info > div > div > drawer-more > p')
                description = description_element.text.strip() if description_element else 'Not found'

                where_to_watch = soup.select('#where-to-watch > bubbles-overflow-container > where-to-watch-meta')
                platform_links = []
                for meta in where_to_watch:
                    link = meta.get('href')
                    platform_name = meta.get('affiliate')
                    platform_links.append((link, platform_name))

        movie_info = {
            'title': title,
            'link_to_rt': link_to_movie_page,
            'poster': poster_jpg,
            'year': year,
            'description': description,
            'links': platform_links,
        }
        movie_info_list.append(movie_info)

    for tvSeries in list2:
        link_to_tvseries_page = tvSeries.find('a', class_='unset').get('href')
        print(link_to_tvseries_page)

        title_el = tvSeries.select_one('search-page-media-row:nth-child(1) > a:nth-child(2)')
        title = title_el.text.strip() if title_el else 'Not found'
        poster_jpg = tvSeries.find('img').get('src')

        if link_to_tvseries_page:
            response = requests.get(link_to_tvseries_page)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')

                info_element = soup.select_one('#series-info > div > ul > li:nth-child(3) > span').text
                year = info_element[8:]

                description_element = soup.select_one('#series-info > div >  drawer-more > p')
                description = description_element.text.strip() if description_element else 'Not found'

                where_to_watch = soup.select('#where-to-watch > bubbles-overflow-container > where-to-watch-meta')
                platform_links = []
                for meta in where_to_watch:
                    link = meta.get('href')
                    platform_name = meta.get('affiliate')
                    platform_links.append((link, platform_name))

        tvSeries_info = {
            'title': title,
            'link_to_rt': link_to_tvseries_page,
            'poster': poster_jpg,
            'year': year,
            'description': description,
            'links': platform_links,
        }
        movie_info_list.append(tvSeries_info)

    return movie_info_list

