namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcaoCMRcustomer : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ColorMatchRequests", "Customer_Id", c => c.Int(nullable: false));
            AddColumn("dbo.ColorMatchRequests", "Customer_Id1", c => c.Int());
            CreateIndex("dbo.ColorMatchRequests", "Customer_Id1");
            AddForeignKey("dbo.ColorMatchRequests", "Customer_Id1", "dbo.Customers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ColorMatchRequests", "Customer_Id1", "dbo.Customers");
            DropIndex("dbo.ColorMatchRequests", new[] { "Customer_Id1" });
            DropColumn("dbo.ColorMatchRequests", "Customer_Id1");
            DropColumn("dbo.ColorMatchRequests", "Customer_Id");
        }
    }
}
