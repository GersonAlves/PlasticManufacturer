namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrecaocustomerXaddress : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CustomerCustomerAddresses", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.CustomerCustomerAddresses", "CustomerAddress_Id", "dbo.CustomerAddresses");
            DropIndex("dbo.CustomerCustomerAddresses", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerCustomerAddresses", new[] { "CustomerAddress_Id" });
            AddColumn("dbo.CustomerAddresses", "Customers_Id", c => c.Int());
            CreateIndex("dbo.CustomerAddresses", "Customers_Id");
            AddForeignKey("dbo.CustomerAddresses", "Customers_Id", "dbo.Customers", "Id");
            DropTable("dbo.CustomerCustomerAddresses");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.CustomerCustomerAddresses",
                c => new
                    {
                        Customer_Id = c.Int(nullable: false),
                        CustomerAddress_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Customer_Id, t.CustomerAddress_Id });
            
            DropForeignKey("dbo.CustomerAddresses", "Customers_Id", "dbo.Customers");
            DropIndex("dbo.CustomerAddresses", new[] { "Customers_Id" });
            DropColumn("dbo.CustomerAddresses", "Customers_Id");
            CreateIndex("dbo.CustomerCustomerAddresses", "CustomerAddress_Id");
            CreateIndex("dbo.CustomerCustomerAddresses", "Customer_Id");
            AddForeignKey("dbo.CustomerCustomerAddresses", "CustomerAddress_Id", "dbo.CustomerAddresses", "Id", cascadeDelete: true);
            AddForeignKey("dbo.CustomerCustomerAddresses", "Customer_Id", "dbo.Customers", "Id", cascadeDelete: true);
        }
    }
}
