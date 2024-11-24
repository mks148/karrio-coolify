# Generated by Django 3.1.8 on 2021-04-09 08:52

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0010_auto_20210403_1404'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('providers', '0009_auto_20210308_0302'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FedexExpressSettings',
            new_name='FedexSettings',
        ),
        migrations.RenameModel(
            old_name='UPSPackageSettings',
            new_name='UPSSettings',
        ),
        migrations.AlterModelOptions(
            name='fedexsettings',
            options={'verbose_name': 'FedEx Settings', 'verbose_name_plural': 'FedEx Settings'},
        ),
        migrations.AlterModelOptions(
            name='upssettings',
            options={'verbose_name': 'UPS Settings', 'verbose_name_plural': 'UPS Settings'},
        ),
    ]