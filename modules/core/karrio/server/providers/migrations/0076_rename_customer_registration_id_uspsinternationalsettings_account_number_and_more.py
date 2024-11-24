# Generated by Django 4.2.14 on 2024-07-27 13:09

from django import forms
from django.db import migrations, models
import django.utils.timezone
import karrio.lib as lib


def forwards_func(apps, schema_editor):
    db_alias = schema_editor.connection.alias
    USPSSettings = apps.get_model("providers", "USPSSettings")
    USPSInternationalSettings = apps.get_model("providers", "USPSInternationalSettings")

    usps_accounts = USPSSettings.objects.using(db_alias).all().iterator()
    usps_intl_accounts = (
        USPSInternationalSettings.objects.using(db_alias).all().iterator()
    )

    carrier_accounts = [
        *[(_.carrier_ptr, _) for _ in usps_accounts],
        *[(_.carrier_ptr, _) for _ in usps_intl_accounts],
    ]

    for _carrier, _settings in carrier_accounts:
        _carrier.metadata = {
            **(_carrier.metadata or {}),
            "__settings": {
                "carrier_name": "usps",
                **(_carrier.metadata or {}).get("__settings", {}),
                **(lib.failsafe(lambda: forms.model_to_dict(_settings)) or {}),
            },
        }

        _carrier.save(using=db_alias)


def reverse_func(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("providers", "0075_haypostsettings"),
    ]

    operations = [
        migrations.RunPython(forwards_func, reverse_func),
        migrations.RenameField(
            model_name="uspsinternationalsettings",
            old_name="customer_registration_id",
            new_name="account_number",
        ),
        migrations.RenameField(
            model_name="uspsinternationalsettings",
            old_name="logistics_manager_mailer_id",
            new_name="account_type",
        ),
        migrations.RemoveField(
            model_name="uspsinternationalsettings",
            name="mailer_id",
        ),
        migrations.RemoveField(
            model_name="uspsinternationalsettings",
            name="password",
        ),
        migrations.RemoveField(
            model_name="uspsinternationalsettings",
            name="username",
        ),
        migrations.RemoveField(
            model_name="uspssettings",
            name="customer_registration_id",
        ),
        migrations.RemoveField(
            model_name="uspssettings",
            name="logistics_manager_mailer_id",
        ),
        migrations.RemoveField(
            model_name="uspssettings",
            name="mailer_id",
        ),
        migrations.RemoveField(
            model_name="uspssettings",
            name="password",
        ),
        migrations.RemoveField(
            model_name="uspssettings",
            name="username",
        ),
        migrations.AddField(
            model_name="uspsinternationalsettings",
            name="client_id",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="uspsinternationalsettings",
            name="client_secret",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="uspssettings",
            name="account_number",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="uspssettings",
            name="account_type",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="uspssettings",
            name="client_id",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="uspssettings",
            name="client_secret",
            field=models.CharField(default=django.utils.timezone.now, max_length=100),
            preserve_default=False,
        ),
    ]
