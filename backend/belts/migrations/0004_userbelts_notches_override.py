# Generated by Django 2.2.1 on 2019-05-22 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('belts', '0003_userbelts'),
    ]

    operations = [
        migrations.AddField(
            model_name='userbelts',
            name='notches_override',
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
