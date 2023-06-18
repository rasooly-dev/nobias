import newspaper

def extract_main_article(url):
    # Create a Newspaper3k Article object
    article = newspaper.Article(url)

    # Download and parse the article
    article.download()
    article.parse()

    # Extract the main article text
    main_article = article.text

    return main_article