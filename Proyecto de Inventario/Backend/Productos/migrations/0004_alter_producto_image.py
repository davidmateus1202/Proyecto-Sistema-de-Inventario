# Generated by Django 5.0.6 on 2024-06-26 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Productos', '0003_alter_producto_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
