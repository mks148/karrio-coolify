# Generated by Django 3.2.11 on 2022-03-04 16:17

from django.db import migrations, models


def forwards_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    Shipment = apps.get_model("manager", "Shipment")

    Shipment.objects.using(db_alias).filter(status="created").update(status="draft")
    Shipment.objects.using(db_alias).filter(
        models.Q(status="transit") | models.Q(status="in-transit")
    ).update(status="in_transit")


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("manager", "0029_auto_20220303_1249"),
    ]

    operations = [
        migrations.AlterField(
            model_name="shipment",
            name="status",
            field=models.CharField(
                choices=[
                    ("draft", "draft"),
                    ("purchased", "purchased"),
                    ("cancelled", "cancelled"),
                    ("shipped", "shipped"),
                    ("in_transit", "in_transit"),
                    ("delivered", "delivered"),
                ],
                default="draft",
                max_length=50,
            ),
        ),
        migrations.RunPython(forwards_func, reverse_func),
    ]
