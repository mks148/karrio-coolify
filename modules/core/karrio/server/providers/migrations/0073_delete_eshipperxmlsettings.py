# Generated by Django 4.2.11 on 2024-07-14 09:08

from django import forms
import karrio.lib as lib
from django.db import migrations


def forwards_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    EShipperXMLSettings = apps.get_model("providers", "EShipperXMLSettings")
    carrier_accounts = EShipperXMLSettings.objects.using(db_alias).all().iterator()

    for _carrier, _settings in [(_.carrier_ptr, _) for _ in carrier_accounts]:
        _carrier.metadata = {
            **(_carrier.metadata or {}),
            "__settings": {
                "carrier_name": "eshipper",
                **(_carrier.metadata or {}).get("__settings", {}),
                **(lib.failsafe(lambda: forms.model_to_dict(_settings)) or {}),
            },
        }

        _carrier.save(using=db_alias)


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("providers", "0072_rename_eshippersettings_eshipperxmlsettings_and_more"),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
        migrations.DeleteModel(
            name="EShipperXMLSettings",
        ),
    ]