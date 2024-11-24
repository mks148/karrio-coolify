# Generated by Django 3.2.14 on 2022-08-28 01:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('providers', '0036_upsfreightsettings'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChronopostSettings',
            fields=[
                ('carrier_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='providers.carrier')),
                ('password', models.CharField(max_length=50)),
                ('account_number', models.CharField(blank=True, default='', max_length=50)),
                ('account_country_code', models.CharField(blank=True, choices=[('AD', 'AD'), ('AE', 'AE'), ('AF', 'AF'), ('AG', 'AG'), ('AI', 'AI'), ('AL', 'AL'), ('AM', 'AM'), ('AN', 'AN'), ('AO', 'AO'), ('AR', 'AR'), ('AS', 'AS'), ('AT', 'AT'), ('AU', 'AU'), ('AW', 'AW'), ('AZ', 'AZ'), ('BA', 'BA'), ('BB', 'BB'), ('BD', 'BD'), ('BE', 'BE'), ('BF', 'BF'), ('BG', 'BG'), ('BH', 'BH'), ('BI', 'BI'), ('BJ', 'BJ'), ('BM', 'BM'), ('BN', 'BN'), ('BO', 'BO'), ('BR', 'BR'), ('BS', 'BS'), ('BT', 'BT'), ('BW', 'BW'), ('BY', 'BY'), ('BZ', 'BZ'), ('CA', 'CA'), ('CD', 'CD'), ('CF', 'CF'), ('CG', 'CG'), ('CH', 'CH'), ('CI', 'CI'), ('CK', 'CK'), ('CL', 'CL'), ('CM', 'CM'), ('CN', 'CN'), ('CO', 'CO'), ('CR', 'CR'), ('CU', 'CU'), ('CV', 'CV'), ('CY', 'CY'), ('CZ', 'CZ'), ('DE', 'DE'), ('DJ', 'DJ'), ('DK', 'DK'), ('DM', 'DM'), ('DO', 'DO'), ('DZ', 'DZ'), ('EC', 'EC'), ('EE', 'EE'), ('EG', 'EG'), ('ER', 'ER'), ('ES', 'ES'), ('ET', 'ET'), ('FI', 'FI'), ('FJ', 'FJ'), ('FK', 'FK'), ('FM', 'FM'), ('FO', 'FO'), ('FR', 'FR'), ('GA', 'GA'), ('GB', 'GB'), ('GD', 'GD'), ('GE', 'GE'), ('GF', 'GF'), ('GG', 'GG'), ('GH', 'GH'), ('GI', 'GI'), ('GL', 'GL'), ('GM', 'GM'), ('GN', 'GN'), ('GP', 'GP'), ('GQ', 'GQ'), ('GR', 'GR'), ('GT', 'GT'), ('GU', 'GU'), ('GW', 'GW'), ('GY', 'GY'), ('HK', 'HK'), ('HN', 'HN'), ('HR', 'HR'), ('HT', 'HT'), ('HU', 'HU'), ('IC', 'IC'), ('ID', 'ID'), ('IE', 'IE'), ('IL', 'IL'), ('IN', 'IN'), ('IQ', 'IQ'), ('IR', 'IR'), ('IS', 'IS'), ('IT', 'IT'), ('JE', 'JE'), ('JM', 'JM'), ('JO', 'JO'), ('JP', 'JP'), ('KE', 'KE'), ('KG', 'KG'), ('KH', 'KH'), ('KI', 'KI'), ('KM', 'KM'), ('KN', 'KN'), ('KP', 'KP'), ('KR', 'KR'), ('KV', 'KV'), ('KW', 'KW'), ('KY', 'KY'), ('KZ', 'KZ'), ('LA', 'LA'), ('LB', 'LB'), ('LC', 'LC'), ('LI', 'LI'), ('LK', 'LK'), ('LR', 'LR'), ('LS', 'LS'), ('LT', 'LT'), ('LU', 'LU'), ('LV', 'LV'), ('LY', 'LY'), ('MA', 'MA'), ('MC', 'MC'), ('MD', 'MD'), ('ME', 'ME'), ('MG', 'MG'), ('MH', 'MH'), ('MK', 'MK'), ('ML', 'ML'), ('MM', 'MM'), ('MN', 'MN'), ('MO', 'MO'), ('MP', 'MP'), ('MQ', 'MQ'), ('MR', 'MR'), ('MS', 'MS'), ('MT', 'MT'), ('MU', 'MU'), ('MV', 'MV'), ('MW', 'MW'), ('MX', 'MX'), ('MY', 'MY'), ('MZ', 'MZ'), ('NA', 'NA'), ('NC', 'NC'), ('NE', 'NE'), ('NG', 'NG'), ('NI', 'NI'), ('NL', 'NL'), ('NO', 'NO'), ('NP', 'NP'), ('NR', 'NR'), ('NU', 'NU'), ('NZ', 'NZ'), ('OM', 'OM'), ('PA', 'PA'), ('PE', 'PE'), ('PF', 'PF'), ('PG', 'PG'), ('PH', 'PH'), ('PK', 'PK'), ('PL', 'PL'), ('PR', 'PR'), ('PT', 'PT'), ('PW', 'PW'), ('PY', 'PY'), ('QA', 'QA'), ('RE', 'RE'), ('RO', 'RO'), ('RS', 'RS'), ('RU', 'RU'), ('RW', 'RW'), ('SA', 'SA'), ('SB', 'SB'), ('SC', 'SC'), ('SD', 'SD'), ('SE', 'SE'), ('SG', 'SG'), ('SH', 'SH'), ('SI', 'SI'), ('SK', 'SK'), ('SL', 'SL'), ('SM', 'SM'), ('SN', 'SN'), ('SO', 'SO'), ('SR', 'SR'), ('SS', 'SS'), ('ST', 'ST'), ('SV', 'SV'), ('SY', 'SY'), ('SZ', 'SZ'), ('TC', 'TC'), ('TD', 'TD'), ('TG', 'TG'), ('TH', 'TH'), ('TJ', 'TJ'), ('TL', 'TL'), ('TN', 'TN'), ('TO', 'TO'), ('TR', 'TR'), ('TT', 'TT'), ('TV', 'TV'), ('TW', 'TW'), ('TZ', 'TZ'), ('UA', 'UA'), ('UG', 'UG'), ('US', 'US'), ('UY', 'UY'), ('UZ', 'UZ'), ('VA', 'VA'), ('VC', 'VC'), ('VE', 'VE'), ('VG', 'VG'), ('VI', 'VI'), ('VN', 'VN'), ('VU', 'VU'), ('WS', 'WS'), ('XB', 'XB'), ('XC', 'XC'), ('XE', 'XE'), ('XM', 'XM'), ('XN', 'XN'), ('XS', 'XS'), ('XY', 'XY'), ('YE', 'YE'), ('YT', 'YT'), ('ZA', 'ZA'), ('ZM', 'ZM'), ('ZW', 'ZW')], max_length=3)),
            ],
            options={
                'verbose_name': 'Chronopost Settings',
                'verbose_name_plural': 'Chronopost Settings',
                'db_table': 'chronopost-settings',
            },
            bases=('providers.carrier',),
        ),
    ]
