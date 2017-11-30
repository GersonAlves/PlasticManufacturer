namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CustomerShipViaAccount : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.CustomerShipViaAccounts", name: "Customer_Id", newName: "Customers_Id");
            RenameIndex(table: "dbo.CustomerShipViaAccounts", name: "IX_Customer_Id", newName: "IX_Customers_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.CustomerShipViaAccounts", name: "IX_Customers_Id", newName: "IX_Customer_Id");
            RenameColumn(table: "dbo.CustomerShipViaAccounts", name: "Customers_Id", newName: "Customer_Id");
        }
    }
}
