from backend import scraper


def merge_movies(movie_name):
    results_from_ev = scraper.search_movie_ev01(movie_name)
    results_from_euro = scraper.search_movie_europix(movie_name)
    results_from_rt = scraper.search_rt(movie_name)

    merged_movies = {}

    sources = [
        (results_from_euro, 'europix'),
        (results_from_ev, 'ev'),
        (results_from_rt, 'rt')
    ]

    for source_list, source_name in sources:
        for movie in source_list:
            title = movie['title']
            year = movie['year']
            if title not in merged_movies:
                merged_movies[title] = [{'source': source_name, 'info': movie}]
            else:
                year_exists = False
                for existing_movie in merged_movies[title]:
                    if existing_movie['info']['year'] == year:
                        year_exists = True
                        break
                if year_exists:
                    merged_movies[title].append({'source': source_name, 'info': movie})

    return merged_movies

