
def forall(l, f):
    for x in l:
        if not f(x):
            print(x, "is not valid")
            return False
    return True

def is_valid_char(c: str):
    """ Is c ascii alphabetic ? """
    return (ord('a') <= ord(c) <= ord('z') or c == 'é' or c == 'è' or c == 'à' or c == 'ç' or c == 'ù' or c == 'â' or c == 'ê' or c == 'î' or c == 'ô' or c == 'û' or c == 'ë' or c == 'ï' or c == 'ü' or c == 'œ' or c == 'æ' or c=="-" or c=="" or c==" " or c == "'" )

def delete_capitals():

    with open("pairs_no_m_no_db.csv", 'r') as f :
        text = f.readlines()
    
    with open("db.csv", "w") as f:
        for line in text: 
            s = line.split(';')
            if len(s) != 2 : print("!= 2 : ", line)
            # print(s[0], s[1])
            if forall(s[0].strip(), is_valid_char) and forall(s[1].strip(), is_valid_char):
                    f.write(line)
            


def coherent(word, words):
    for other in words: 
        i = min(len(word), len(other))
        # print(word[:i], other[:i])
        if word[:i] == other[:i]:
            return True
        return False


def delete_doublons():

    with open("pairs_no_m.csv", 'r') as f:
        text = f.readlines()

    words = []

    with open("pairs_m_db.csv", "w") as f:

        for line in text:
            word = line.split(";")[0][:-2]
            if coherent(word, words):
                continue
            # print("W =", words)
            words.append(word)
            f.write(line)
    
        

delete_capitals()
