namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcaoCMRcustomer2 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.ColorMatchRequests", new[] { "Customer_Id1" });
            DropColumn("dbo.ColorMatchRequests", "Customer_Id");
            RenameColumn(table: "dbo.ColorMatchRequests", name: "Customer_Id1", newName: "Customer_Id");
            AlterColumn("dbo.ColorMatchRequests", "Customer_Id", c => c.Int());
            CreateIndex("dbo.ColorMatchRequests", "Customer_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.ColorMatchRequests", new[] { "Customer_Id" });
            AlterColumn("dbo.ColorMatchRequests", "Customer_Id", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.ColorMatchRequests", name: "Customer_Id", newName: "Customer_Id1");
            AddColumn("dbo.ColorMatchRequests", "Customer_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.ColorMatchRequests", "Customer_Id1");
        }
    }
}
