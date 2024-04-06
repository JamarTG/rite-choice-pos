import Product from "../schemas/product.js";

class ReportControler {
    static async getReportData(_, res) {
        try {
          const products = await Product.find();
    
          const totalProducts = products.length;
          const totalQuantitySold = products.reduce((acc, product) => acc + product.quantitySold, 0);
          const totalRevenue = products.reduce((acc, product) => acc + product.unitPrice * product.quantitySold, 0);
    
          const averageUnitPrice = (totalRevenue / totalProducts).toFixed(2);
          const averageStockLevel = (products.reduce((acc, product) => acc + product.amountInStock, 0) / totalProducts).toFixed(2);
          const averageQuantitySold = (totalQuantitySold / totalProducts).toFixed(2);
    
          const topSellingProducts = [...products].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 3);
          const lowStockProducts = products.filter(product => product.amountInStock < 40);
    
          res.status(200).json({
            success: true,
            data: {
              totalProducts,
              totalQuantitySold,
              totalRevenue,
              averageUnitPrice,
              averageStockLevel,
              averageQuantitySold,
              topSellingProducts,
              lowStockProducts
            }
          });
        } catch (error) {
          res.status(500).json({ success: false, message: `Internal server error: ${error}` });
        }
      }
}

export default ReportControler;