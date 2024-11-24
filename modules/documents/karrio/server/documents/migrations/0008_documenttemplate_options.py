# Generated by Django 4.2.16 on 2024-10-17 04:48

from django.db import migrations, models
import functools
import karrio.server.core.models


class Migration(migrations.Migration):

    dependencies = [
        ("documents", "0007_alter_documenttemplate_related_object"),
    ]

    operations = [
        migrations.AddField(
            model_name="documenttemplate",
            name="options",
            field=models.JSONField(
                blank=True,
                default=functools.partial(
                    karrio.server.core.models._identity, *(), **{"value": {}}
                ),
                null=True,
            ),
        ),
    ]