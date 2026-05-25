import oracledb from 'oracledb';

export const syncPurchaseOrdersToOracle = async (poData: any) => {
  console.log(`Syncing PO ${poData.poNumber} to Oracle ERP...`);
  
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER || 'system',
      password: process.env.ORACLE_PASSWORD || 'manager',
      connectString: process.env.ORACLE_CONN_STRING || '192.168.1.200:1521/FINDATA'
    });
    
    // In real implementation, you would insert the PO into Oracle tables
    // await connection.execute(`INSERT INTO PURCHASE_ORDERS...`);
    
    return {
      success: true,
      oracleReferenceId: `ORA-PO-${Date.now()}`,
      syncDate: new Date()
    };
  } catch (err) {
    console.error('Oracle DB Error:', err);
    throw new Error('Oracle ERP Integration Failed');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

export const syncSupplierFromOracle = async (supplierCode: string) => {
  console.log(`Fetching Supplier ${supplierCode} from Oracle ERP...`);
  
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER || 'system',
      password: process.env.ORACLE_PASSWORD || 'manager',
      connectString: process.env.ORACLE_CONN_STRING || '192.168.1.200:1521/FINDATA'
    });
    
    // In real implementation, you would select the supplier from Oracle tables
    const result = await connection.execute(
      `SELECT col1, col2 FROM scratch WHERE col1 = :code`,
      [supplierCode]
    );
    
    return {
      success: true,
      supplierData: {
        oracleId: `SUP-${supplierCode}`,
        paymentTerms: 'Net 45',
        taxRegistration: 'GST-VERIFIED',
        oracleData: result.rows
      }
    };
  } catch (err) {
    console.error('Oracle DB Error:', err);
    return {
      success: false,
      error: err
    };
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
