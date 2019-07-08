import psycopg2
from psycopg2 import Error

try:
    connection = psycopg2.connect(user = "kmcspurren",
                                  password = "millwood",
                                  host = "localhost",
                                  port = "",
                                  database = "content2")

    cursor = connection.cursor()

    data_actions = [
        "TRUNCATE content_beltlevel, content_question, content_category, content_questiontype CASCADE;",
        "COPY content_beltlevel FROM '/Users/kmhome/Development/Experiment/buildout1/proto1/data/beltlevels2.csv' DELIMITER ',' CSV",
        "COPY content_category FROM '/Users/kmhome/Development/Experiment/buildout1/proto1/data/category.csv' DELIMITER ',' CSV",
        "COPY content_questiontype FROM '/Users/kmhome/Development/Experiment/buildout1/proto1/data/questiontypes.csv' DELIMITER ',' CSV",
        ]

    # Loop to run through all data_actions to populate database
    for action in data_actions:
      cursor.execute(action)
      connection.commit()


except (Exception, psycopg2.DatabaseError) as error :
    print ("Error while creating PostgreSQL table", error)
finally:
    #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("🐬.  Success. PostgreSQL connection is closed.")