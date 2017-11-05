namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AlteracaoStatusCustomer : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Customers", "Status_Id", "dbo.CustomerStatus");
            DropIndex("dbo.Customers", new[] { "Status_Id" });
            AlterColumn("dbo.Customers", "Status_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Customers", "Status_Id");
            AddForeignKey("dbo.Customers", "Status_Id", "dbo.CustomerStatus", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Customers", "Status_Id", "dbo.CustomerStatus");
            DropIndex("dbo.Customers", new[] { "Status_Id" });
            AlterColumn("dbo.Customers", "Status_Id", c => c.Int());
            CreateIndex("dbo.Customers", "Status_Id");
            AddForeignKey("dbo.Customers", "Status_Id", "dbo.CustomerStatus", "Id");
        }
    }
}
