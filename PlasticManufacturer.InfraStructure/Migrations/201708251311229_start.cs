namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class start : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AddressTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Cities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        State_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.States", t => t.State_Id)
                .Index(t => t.State_Id);
            
            CreateTable(
                "dbo.Costs",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Value = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RawMaterialId = c.Int(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Currency_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Currencies", t => t.Currency_Id)
                .ForeignKey("dbo.RawMaterials", t => t.RawMaterialId, cascadeDelete: true)
                .Index(t => t.RawMaterialId)
                .Index(t => t.Currency_Id);
            
            CreateTable(
                "dbo.Currencies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerAddresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Street = c.String(),
                        Complement = c.String(),
                        ZipCode = c.String(),
                        Phone = c.String(),
                        Fax = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        AddressType_Id = c.Int(),
                        City_Id = c.Int(),
                        State_Id = c.Int(),
                        Customer_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AddressTypes", t => t.AddressType_Id)
                .ForeignKey("dbo.Cities", t => t.City_Id)
                .ForeignKey("dbo.States", t => t.State_Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .Index(t => t.AddressType_Id)
                .Index(t => t.City_Id)
                .Index(t => t.State_Id)
                .Index(t => t.Customer_Id);
            
            CreateTable(
                "dbo.States",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerDefaults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MailingList = c.Boolean(nullable: false),
                        MutipleSites = c.Boolean(nullable: false),
                        Reference = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Freights_Id = c.Int(),
                        SecondLabel_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Freights", t => t.Freights_Id)
                .ForeignKey("dbo.SecondLabels", t => t.SecondLabel_Id)
                .Index(t => t.Freights_Id)
                .Index(t => t.SecondLabel_Id);
            
            CreateTable(
                "dbo.Freights",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.SecondLabels",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LastName = c.String(),
                        Code = c.String(),
                        Prospect = c.Boolean(nullable: false),
                        Lead = c.Boolean(nullable: false),
                        FedId = c.Int(nullable: false),
                        Notes = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        AuthorizedBy_Id = c.Int(),
                        ContactedBy_Id = c.Int(),
                        CustomerDefaults_Id = c.Int(),
                        SalesRepresentant_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.AuthorizedBy_Id)
                .ForeignKey("dbo.CustomerContacteds", t => t.ContactedBy_Id)
                .ForeignKey("dbo.CustomerDefaults", t => t.CustomerDefaults_Id)
                .ForeignKey("dbo.Employees", t => t.SalesRepresentant_Id)
                .Index(t => t.AuthorizedBy_Id)
                .Index(t => t.ContactedBy_Id)
                .Index(t => t.CustomerDefaults_Id)
                .Index(t => t.SalesRepresentant_Id);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerContacteds",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerShipViaAccounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        ShippingMethod_Id = c.Int(),
                        Customer_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ShippingMethods", t => t.ShippingMethod_Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .Index(t => t.ShippingMethod_Id)
                .Index(t => t.Customer_Id);
            
            CreateTable(
                "dbo.ShippingMethods",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerRatings",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomerStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.RawMaterials",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(),
                        Notes = c.String(),
                        ChemicalName = c.String(),
                        Status = c.Boolean(nullable: false),
                        OperationType = c.String(),
                        Category = c.String(),
                        MainSupplier = c.String(),
                        MainCustomer = c.String(),
                        HeatStability = c.String(),
                        LightSatability = c.String(),
                        Fda = c.Boolean(nullable: false),
                        Hbfb = c.Boolean(nullable: false),
                        QCRequired = c.Boolean(nullable: false),
                        BarCode = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Costs", "RawMaterialId", "dbo.RawMaterials");
            DropForeignKey("dbo.CustomerShipViaAccounts", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.CustomerShipViaAccounts", "ShippingMethod_Id", "dbo.ShippingMethods");
            DropForeignKey("dbo.Customers", "SalesRepresentant_Id", "dbo.Employees");
            DropForeignKey("dbo.Customers", "CustomerDefaults_Id", "dbo.CustomerDefaults");
            DropForeignKey("dbo.Customers", "ContactedBy_Id", "dbo.CustomerContacteds");
            DropForeignKey("dbo.Customers", "AuthorizedBy_Id", "dbo.Employees");
            DropForeignKey("dbo.CustomerAddresses", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.CustomerDefaults", "SecondLabel_Id", "dbo.SecondLabels");
            DropForeignKey("dbo.CustomerDefaults", "Freights_Id", "dbo.Freights");
            DropForeignKey("dbo.CustomerAddresses", "State_Id", "dbo.States");
            DropForeignKey("dbo.Cities", "State_Id", "dbo.States");
            DropForeignKey("dbo.CustomerAddresses", "City_Id", "dbo.Cities");
            DropForeignKey("dbo.CustomerAddresses", "AddressType_Id", "dbo.AddressTypes");
            DropForeignKey("dbo.Costs", "Currency_Id", "dbo.Currencies");
            DropIndex("dbo.CustomerShipViaAccounts", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerShipViaAccounts", new[] { "ShippingMethod_Id" });
            DropIndex("dbo.Customers", new[] { "SalesRepresentant_Id" });
            DropIndex("dbo.Customers", new[] { "CustomerDefaults_Id" });
            DropIndex("dbo.Customers", new[] { "ContactedBy_Id" });
            DropIndex("dbo.Customers", new[] { "AuthorizedBy_Id" });
            DropIndex("dbo.CustomerDefaults", new[] { "SecondLabel_Id" });
            DropIndex("dbo.CustomerDefaults", new[] { "Freights_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "Customer_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "State_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "City_Id" });
            DropIndex("dbo.CustomerAddresses", new[] { "AddressType_Id" });
            DropIndex("dbo.Costs", new[] { "Currency_Id" });
            DropIndex("dbo.Costs", new[] { "RawMaterialId" });
            DropIndex("dbo.Cities", new[] { "State_Id" });
            DropTable("dbo.RawMaterials");
            DropTable("dbo.Products");
            DropTable("dbo.CustomerStatus");
            DropTable("dbo.CustomerRatings");
            DropTable("dbo.ShippingMethods");
            DropTable("dbo.CustomerShipViaAccounts");
            DropTable("dbo.CustomerContacteds");
            DropTable("dbo.Employees");
            DropTable("dbo.Customers");
            DropTable("dbo.SecondLabels");
            DropTable("dbo.Freights");
            DropTable("dbo.CustomerDefaults");
            DropTable("dbo.States");
            DropTable("dbo.CustomerAddresses");
            DropTable("dbo.Currencies");
            DropTable("dbo.Costs");
            DropTable("dbo.Cities");
            DropTable("dbo.AddressTypes");
        }
    }
}
