# this file connects to the postgres dB and creates a seed dB
# one question for each: belt level, category and type (ie. multiple choice)
# should run the related question_field_generator.py before this file to clear out old data

import psycopg2
# for timestamping publication dates of questions
from datetime import datetime
dt = datetime.now()

# for fake content in questions
from faker import Faker
fake = Faker()

# for random ratings from 1-7 on Ratings questions
import random


try:
    connection = psycopg2.connect(user = "kmcspurren",
                                  password = "millwood",
                                  host = "localhost",
                                  port = "",
                                  database = "content2")

    cursor = connection.cursor()

    # List of all Belts
    belt_query = "select belt_name from content_beltlevel"
    cursor.execute(belt_query)
    belts = cursor.fetchall()

    print("Print each belt color")
    belt_list = []
    for belt in belts:
        # print("Color = " + row[0])
        belt_list.append(belt[0])
    print(belt_list)

    # List of all Question Categories
    category_query = "select name from content_category"
    cursor.execute(category_query)
    categories = cursor.fetchall()

    print("Print each belt color")
    category_list = []
    for category in categories:
        # print("Color = " + row[0])
        category_list.append(category[0])
    print(category_list)

    # List of all Question Types
    qtype_query = "select name from content_questiontype"
    cursor.execute(qtype_query)
    qtypes = cursor.fetchall()

    print("Print each qtype")
    qtype_list = []
    for qtype in qtypes:
        # print("Color = " + row[0])
        qtype_list.append(qtype[0])
    print(qtype_list)


    # Insert all questions
    #for cat in range(len(category_list)):
    for q in range(len(qtype_list)):
      for cat in range(len(category_list)):
        for belt in range(len(belt_list)):
          cursor.execute("INSERT INTO content_question (pub_date, question_text, correct_response, incorrect_response, belt_level_id, category_id, qtype_id) VALUES ('"+ str(dt) + "', '"+ fake.text() +"', 'Perfect!', 'Incorrect 🙃', " + str(belt + 1) +", " + str(cat + 1) +", " + str(q + 1) +");")
          cursor.execute("INSERT INTO content_reading (reading_text, belt_level_id, category_id) VALUES ('"+ fake.text() +"', " + str(belt + 1) +", " + str(cat + 1) +");")

        connection.commit()

    # Fill out all question types and answers
    # create a list of all questions ids and corresponding qtypes
    get_all_questions_query = "select id, qtype_id from content_question"
    cursor.execute(get_all_questions_query)
    all_questions = cursor.fetchall()

    id_list = []
    for i in all_questions:

        id_list.append([i[0], i[1]])
    print("There are " + str(len(id_list)) + " questions")
    print(str(len(id_list)))


    for match in range(len(id_list)):
        if id_list[match][1] == 1:
            print(str(match) + "mult")
            cursor.execute("INSERT INTO content_multiplechoice (question_ptr_id, choice_1, choice_2, choice_3, choice_4) VALUES (" + str(id_list[match][0]) +", '"+ fake.text() +"', '"+ fake.text() +"', '"+ fake.text() +"', '"+ fake.text() +"');")
        elif id_list[match][1] == 2:
            cursor.execute("INSERT INTO content_truefalse (question_ptr_id, is_it_true, is_it_false) VALUES (" + str(id_list[match][0]) +", false, false);")
            print(str(match) + "T/F")
        elif id_list[match][1] == 3:
            cursor.execute("INSERT INTO content_rating (question_ptr_id, score) VALUES (" + str(id_list[match][0]) +", '"+ str(random.randint(1, 7)) + "');")
            print(str(match) + "Rating")
        elif id_list[match][1] == 4:
            print(str(match) + "Ranking")
            cursor.execute("INSERT INTO content_ranking (question_ptr_id, choice_1, choice_2, choice_3, choice_4) VALUES (" + str(id_list[match][0]) +", '"+ fake.text() +"', '"+ fake.text() +"', '"+ fake.text() +"', '"+ fake.text() +"');")

        else:
            print(str(match) + "Error")
    connection.commit()









except (Exception, psycopg2.Error) as error :
  print ("Error while fetching data from PostgreSQL", error)
finally:
    #closing database connection.
  if(connection):
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed")
