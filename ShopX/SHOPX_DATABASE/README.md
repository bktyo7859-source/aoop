# SHOPX PostgreSQL database

Run:
1. CREATE DATABASE ecommerce_engine;
2. \c ecommerce_engine
3. \i 'D:/SHOPX DATASET/SHOPX_DATABASE/sql/01_schema.sql'
4. \i 'D:/SHOPX DATASET/SHOPX_DATABASE/sql/02_load_data.sql'
5. \i 'D:/SHOPX DATASET/SHOPX_DATABASE/sql/03_validation.sql'

If your project folder is not `D:/SHOPX DATASET/SHOPX_DATABASE`, edit the paths in 02_load_data.sql.

The `data` folder contains transformed CSVs ready for PostgreSQL COPY.
