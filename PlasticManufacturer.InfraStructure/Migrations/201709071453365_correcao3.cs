namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class correcao3 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ColorCustomerAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        CustomerAddress_Id = c.Int(),
                        ColorMatchRequest_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.CustomerAddresses", t => t.CustomerAddress_Id)
                .ForeignKey("dbo.ColorMatchRequests", t => t.ColorMatchRequest_Id)
                .Index(t => t.CustomerAddress_Id)
                .Index(t => t.ColorMatchRequest_Id);
            
            CreateTable(
                "dbo.Formulae",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        FormulaLine_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.FormulaLines", t => t.FormulaLine_Id)
                .Index(t => t.FormulaLine_Id);
            
            CreateTable(
                "dbo.FormulaLines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.ColorMatchRequests", "LoteId", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "Formula_Id", c => c.Int());
            CreateIndex("dbo.Products", "Formula_Id");
            AddForeignKey("dbo.Products", "Formula_Id", "dbo.Formulae", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Products", "Formula_Id", "dbo.Formulae");
            DropForeignKey("dbo.Formulae", "FormulaLine_Id", "dbo.FormulaLines");
            DropForeignKey("dbo.ColorCustomerAddresses", "ColorMatchRequest_Id", "dbo.ColorMatchRequests");
            DropForeignKey("dbo.ColorCustomerAddresses", "CustomerAddress_Id", "dbo.CustomerAddresses");
            DropIndex("dbo.Formulae", new[] { "FormulaLine_Id" });
            DropIndex("dbo.Products", new[] { "Formula_Id" });
            DropIndex("dbo.ColorCustomerAddresses", new[] { "ColorMatchRequest_Id" });
            DropIndex("dbo.ColorCustomerAddresses", new[] { "CustomerAddress_Id" });
            DropColumn("dbo.Products", "Formula_Id");
            DropColumn("dbo.ColorMatchRequests", "LoteId");
            DropTable("dbo.FormulaLines");
            DropTable("dbo.Formulae");
            DropTable("dbo.ColorCustomerAddresses");
        }
    }
}
