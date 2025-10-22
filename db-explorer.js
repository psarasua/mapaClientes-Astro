import { Client } from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_PbOH1AcBrn7F@ep-plain-sunset-acfy4yn0-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function exploreDatabase() {
    const client = new Client({
        connectionString: connectionString,
    });

    try {
        await client.connect();
        console.log('✅ Conectado a la base de datos PostgreSQL');

        // Listar todas las tablas
        console.log('\n📊 TABLAS EN LA BASE DE DATOS:');
        console.log('================================');
        
        const tablesQuery = `
            SELECT 
                table_name,
                table_type
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `;
        
        const tablesResult = await client.query(tablesQuery);
        
        if (tablesResult.rows.length === 0) {
            console.log('No se encontraron tablas en el esquema public');
            return;
        }

        for (const table of tablesResult.rows) {
            console.log(`📋 ${table.table_name} (${table.table_type})`);
        }

        // Explorar cada tabla
        for (const table of tablesResult.rows) {
            const tableName = table.table_name;
            
            console.log(`\n\n🔍 EXPLORANDO TABLA: ${tableName}`);
            console.log('='.repeat(50));

            // Obtener estructura de la tabla
            const columnsQuery = `
                SELECT 
                    column_name,
                    data_type,
                    is_nullable,
                    column_default
                FROM information_schema.columns 
                WHERE table_name = $1 
                AND table_schema = 'public'
                ORDER BY ordinal_position;
            `;
            
            const columnsResult = await client.query(columnsQuery, [tableName]);
            
            console.log('\n📐 ESTRUCTURA:');
            console.log('Columna\t\t\tTipo\t\t\tNullable\tDefault');
            console.log('-'.repeat(70));
            
            for (const column of columnsResult.rows) {
                const name = column.column_name.padEnd(20);
                const type = column.data_type.padEnd(20);
                const nullable = column.is_nullable.padEnd(8);
                const defaultVal = (column.column_default || 'NULL').substring(0, 15);
                console.log(`${name}\t${type}\t${nullable}\t${defaultVal}`);
            }

            // Contar registros
            const countQuery = `SELECT COUNT(*) as total FROM "${tableName}";`;
            const countResult = await client.query(countQuery);
            const totalRows = countResult.rows[0].total;
            
            console.log(`\n📊 TOTAL DE REGISTROS: ${totalRows}`);

            // Mostrar algunos datos de ejemplo (máximo 5 registros)
            if (totalRows > 0) {
                console.log('\n💾 DATOS DE EJEMPLO (primeros 5 registros):');
                console.log('-'.repeat(70));
                
                const dataQuery = `SELECT * FROM "${tableName}" LIMIT 5;`;
                const dataResult = await client.query(dataQuery);
                
                if (dataResult.rows.length > 0) {
                    console.table(dataResult.rows);
                }
            } else {
                console.log('\n❌ La tabla está vacía');
            }
        }

    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error.message);
        console.error('Detalles:', error.stack);
    } finally {
        await client.end();
        console.log('\n🔌 Conexión cerrada');
    }
}

exploreDatabase();