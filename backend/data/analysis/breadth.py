from datetime import date, timedelta

from belts.models import UserAnswer
from .accuracy import category_attempts

from statistics import stdev 
 
  # breadth borrows data from category_attempts to give a sense of balance
def breadth(user):
    category_answered = category_attempts(user=user)
    total_questions = 0
    total_correct = 0
    counter = 0
    for category in category_answered:
      total_questions += category['answered']
      # total_correct += category['correct']
      counter += 1
    
    # if the user has answered no questions
    if total_questions != 0:
      category_mean = 100/counter
      answered_data = []
      correct_data = []
      breadth_packet = []

      for category in category_answered:
        breadth_analytics = {}
        rating = ''
        category_answered_percentage = round(100 * category['answered']/total_questions)
        attepmted_delta = category_answered_percentage - category_mean
        # category_correct_perecentage = round(100 * category['correct']/total_correct)

        
        # give the category a rating versus the normal, even splits among categories
        
        if attepmted_delta <= -12:
          rating = 'Very Underdeveloped'
        elif attepmted_delta <= -8:
          rating = 'Underdeveloped'
        elif attepmted_delta <= -5:
          rating = 'Good'
        elif attepmted_delta <= -3:
          rating = 'Perfect Balance'
        elif attepmted_delta <= 3:
          rating = 'Perfect Balance'
        elif attepmted_delta <= 5:
          rating = 'Good'
        elif attepmted_delta <= 8:
          rating = 'Overdeveloped'
        elif attepmted_delta >= 12:
          rating = 'Very Overdeveloped'
        else:
          rating = '??'

        answered_data.append(category_answered_percentage)
        # correct_data.append(category_correct_perecentage)
        
        breadth_analytics = {
          "category": category['category'],
          "color": category['color'],
          "percent_attempts": category_answered_percentage,
          # "percent_correct": category_correct_perecentage,
          "categoryrating": rating,
        }
        breadth_packet.append(breadth_analytics)

      
      answer_breadth = stdev(answered_data)
      if answer_breadth >= 13:
        overall_rating = 'Poor'
      elif answer_breadth >= 10:
        overall_rating = 'Needs work'
      elif answer_breadth >= 7:
        overall_rating = 'Decent'
      elif answer_breadth >= 3:
        overall_rating = 'Good'
      else:
        overall_rating = 'Perfect'


      # correct_breadth = stdev(correct_data)
      breadth_payload = {
        "breadth_data": breadth_packet,
        "answer_deviation": overall_rating,
        # "correct_deviation": correct_breadth,
      }
      
      return breadth_payload
    else:
      breadth_payload = {
        "answer_deviation": 'No data yet...',
        # "correct_deviation": correct_breadth,
      }

      return breadth_payload