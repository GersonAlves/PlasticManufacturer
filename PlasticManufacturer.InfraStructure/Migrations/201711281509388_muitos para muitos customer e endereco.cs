namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class muitosparamuitoscustomereendereco : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CustomerAddresses", "Customer_Id", "dbo.Customers");
            DropIndex("dbo.CustomerAddresses", new[] { "Customer_Id" });
            CreateTable(
                "dbo.CustomerCustomerAddresses",
                c => new
                    {
                        Customer_Id = c.Int(nullable: false),
                        CustomerAddress_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Customer_Id, t.CustomerAddress_Id })
                .ForeignKey("dbo.Customers", t => t.Customer_Id, cascadeDelete: true)
                .ForeignKey("dbo.CustomerAddresses", t => t.CustomerAddress_Id, cascadeDelete: true)
                .Index(t => t.Customer_Id)
                .Index(t => t.CustomerAddress_Id);
            
            DropColumn("dbo.CustomerAddresses", "Customer_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.CustomerAddresses", "Customer_Id", c => c.Int());
            DropForeignKey("dbo.CustomerCustomerAddresses", "CustomerAddress_Id", "dbo.CustomerAddresses");
            DropForeignKey("dbo.CustomerCustomerAddresses", "Customer_Id", "dbo.Customers");
            DropIndex("dbo.CustomerCustomerAddresses", new[] { "CustomerAddress_Id" });
            DropIndex("dbo.CustomerCustomerAddresses", new[] { "Customer_Id" });
            DropTable("dbo.CustomerCustomerAddresses");
            CreateIndex("dbo.CustomerAddresses", "Customer_Id");
            AddForeignKey("dbo.CustomerAddresses", "Customer_Id", "dbo.Customers", "Id");
        }
    }
}
