# Generated by Django 3.2.3 on 2022-03-28 03:40

from django.db import migrations, models


def forwards_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    Tracker = apps.get_model("manager", "Tracking")
    Tracker.objects.using(db_alias).filter(
        models.Q(status="transit") | models.Q(status="in-transit")
    ).update(status="in_transit")


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("manager", "0031_shipment_invoice"),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
    ]
