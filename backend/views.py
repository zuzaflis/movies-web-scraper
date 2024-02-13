from flask import Blueprint, request, send_from_directory
from flask_cors import CORS, cross_origin
from backend import movies_merger, app

views = Blueprint(__name__, "views")


@views.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@cross_origin()
@views.route("/search")
def search():
    args = request.args
    movie_name = args.get('movie_name')

    results = movies_merger.merge_movies(movie_name)
    return results
