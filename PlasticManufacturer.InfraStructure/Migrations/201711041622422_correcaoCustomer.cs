namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcaoCustomer : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Customers", new[] { "AuthorizedBy_Id" });
            AlterColumn("dbo.Customers", "AuthorizedBy_Id", c => c.Int());
            CreateIndex("dbo.Customers", "AuthorizedBy_Id");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Customers", new[] { "AuthorizedBy_Id" });
            AlterColumn("dbo.Customers", "AuthorizedBy_Id", c => c.Int(nullable: false));
            CreateIndex("dbo.Customers", "AuthorizedBy_Id");
        }
    }
}
