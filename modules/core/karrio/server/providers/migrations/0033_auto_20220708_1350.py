# Generated by Django 3.2.13 on 2022-07-08 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('providers', '0032_alter_carrier_test'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='carrier',
            options={'ordering': ['test_mode', '-created_at']},
        ),
        migrations.RenameField(
            model_name='carrier',
            old_name='test',
            new_name='test_mode',
        ),
    ]
