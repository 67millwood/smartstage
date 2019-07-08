# Generated by Django 2.2 on 2019-05-02 12:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BeltLevel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('belt_name', models.CharField(max_length=25)),
                ('belt_color', models.CharField(max_length=25)),
                ('belt_rank', models.PositiveSmallIntegerField(null=True)),
                ('belt_notches', models.PositiveSmallIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
                ('color', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question_text', models.TextField(max_length=600)),
                ('correct_response', models.TextField(max_length=300)),
                ('incorrect_response', models.TextField(max_length=300)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
                ('belt_level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='content.BeltLevel')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='content.Category')),
            ],
        ),
        migrations.CreateModel(
            name='QuestionType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='MultipleChoice',
            fields=[
                ('question_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='content.Question')),
                ('choice_1', models.TextField(max_length=300)),
                ('choice_2', models.TextField(max_length=300)),
                ('choice_3', models.TextField(max_length=300)),
                ('choice_4', models.TextField(max_length=300)),
            ],
            bases=('content.question',),
        ),
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('question_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='content.Question')),
                ('choice_1', models.TextField(max_length=300)),
                ('choice_2', models.TextField(max_length=300)),
                ('choice_3', models.TextField(max_length=300)),
                ('choice_4', models.TextField(max_length=300)),
            ],
            bases=('content.question',),
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('question_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='content.Question')),
                ('score', models.PositiveSmallIntegerField(null=True)),
            ],
            bases=('content.question',),
        ),
        migrations.CreateModel(
            name='TrueFalse',
            fields=[
                ('question_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='content.Question')),
                ('is_it_true', models.BooleanField(default=True)),
            ],
            bases=('content.question',),
        ),
        migrations.CreateModel(
            name='UserAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer_date', models.DateTimeField(verbose_name='date answered')),
                ('correct', models.BooleanField(default=True)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='content.Question')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='question',
            name='qtype',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='content.QuestionType'),
        ),
    ]
