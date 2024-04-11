# # from spellchecker import SpellChecker
# # from gensim.utils import simple_preprocess
# # from gensim.models import Word2Vec


from gensim.models import FastText


import numpy as np


def dist(w1: str, w2: str):
    """ Computes the Levenshtein distance between two words """
    d = np.zeros((len(w1)+1, len(w2)+1), dtype=int)
    d[0, :] = range(len(w2)+1)
    d[:, 0] = range(len(w1)+1)

    for i in range(1, len(w1)+1):
        for j in range(1, len(w2)+1):
            diag = d[i-1, j-1] + int(w1[i-1] != w2[j-1])
            d[i, j] = min(diag, d[i-1, j]+1, d[i, j-1]+1)

    return d[-1, -1]


model = FastText.load_fasttext_format("model/cc.fr.300.bin")


# def similar(word: str = "abrupt"):
#     """ Load a FastText model from disk """

#     similar_words = model.wv.most_similar(word, topn=10)

#     return similar_words





def subequal(w1, w2, n):
    for i in range(len(w1)-n):
        if w1[i:i+n] in w2:
            return True
    return False


def forall(l, f):
    for x in l:
        if not f(x):
            return False
    return True

def is_ascii_alpha(c: str):
    """ Is c ascii alphabetic ? """
    return ord('a') <= ord(c) <= ord('z') or ord('A') <= ord(c) <= ord('Z')


from nltk.stem import PorterStemmer


def similar(word: str = "abrupt"):
    """ Load a FastText model from disk """

    stemmer = PorterStemmer()
    word_root = stemmer.stem(word)

    similar_words = model.wv.most_similar(
        word, topn=100)  # get more words initially

    # filter out words with the same root
    filtered_words = [
        w for w in similar_words if stemmer.stem(w[0]) != word_root]

    res = []

    for w, s in filtered_words[:20]:
        if len(w) <= 4 or (not forall(w, is_ascii_alpha)) or dist(w, word) <=3 or subequal(w, word, 3) or s >= 0.8 or s <= 0.2:
            continue
        res.append(w)

    if not res:
        return None

    return res[len(res)//2]


with open("fr.txt", "r") as f:
    text = f.read().split('\n')

with open("pairs.txt", "w") as f:
    for word in text:
        if len(word) >= 5:
            sim = similar(word)
            if sim:
                f.write(f"{word};{sim}\n")
