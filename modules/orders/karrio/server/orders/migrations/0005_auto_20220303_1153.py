# Generated by Django 3.2.11 on 2022-03-03 11:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('manager', '0028_auto_20220303_1153'),
        ('orders', '0004_alter_order_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='shipping_address',
            new_name='shipping_to',
        ),
        migrations.AddField(
            model_name='order',
            name='shipping_from',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='shipper_order', to='manager.address'),
        ),
    ]
