namespace PlasticManufacturer.InfraStructure.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ColorMatchRequest : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Carriers",
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
                "dbo.ColorMatchRequests",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductDescription = c.String(),
                        ProductAplication = c.String(),
                        PriceQuoteRequired = c.Boolean(nullable: false),
                        TargetTypeField = c.String(),
                        SurfaceMatte = c.Boolean(nullable: false),
                        SurfaceGlossy = c.Boolean(nullable: false),
                        SurfaceOthers = c.String(),
                        WallThickness = c.String(),
                        Injection = c.Boolean(nullable: false),
                        Blow = c.Boolean(nullable: false),
                        Compression = c.Boolean(nullable: false),
                        Extrusion = c.Boolean(nullable: false),
                        FiberDenier = c.Boolean(nullable: false),
                        CoEx = c.Boolean(nullable: false),
                        MeltIndex = c.String(),
                        Film = c.Boolean(nullable: false),
                        Sheet = c.Boolean(nullable: false),
                        Rotational = c.Boolean(nullable: false),
                        Mfg = c.Boolean(nullable: false),
                        GasAssitInjection = c.Boolean(nullable: false),
                        Exact = c.Boolean(nullable: false),
                        Commercial = c.Boolean(nullable: false),
                        ClosestSTD = c.String(),
                        MoreDe = c.String(),
                        CieLab = c.Boolean(nullable: false),
                        D65 = c.Boolean(nullable: false),
                        Cfw = c.Boolean(nullable: false),
                        A = c.Boolean(nullable: false),
                        ChipsQty = c.Int(nullable: false),
                        TubeSample = c.Boolean(nullable: false),
                        SheetExtrusionSample = c.Boolean(nullable: false),
                        ConcentrateQty = c.Decimal(nullable: false, precision: 18, scale: 2),
                        UnitQty = c.Decimal(nullable: false, precision: 18, scale: 2),
                        RequiredRatio = c.String(),
                        Interior = c.Boolean(nullable: false),
                        Exterior = c.Boolean(nullable: false),
                        LightLastness = c.String(),
                        Hour = c.DateTime(nullable: false),
                        New = c.Boolean(nullable: false),
                        Reason = c.String(),
                        Uv = c.Boolean(nullable: false),
                        UvPackage = c.String(),
                        IsAntiOxidant = c.Boolean(nullable: false),
                        AntiOxidant = c.String(),
                        IsAntiStat = c.Boolean(nullable: false),
                        AntiStat = c.String(),
                        AdditiveNone = c.Boolean(nullable: false),
                        IsLubricant = c.Boolean(nullable: false),
                        Amount = c.String(),
                        AdditiveOther = c.String(),
                        BestAdditive = c.Boolean(nullable: false),
                        Slip = c.Boolean(nullable: false),
                        Price = c.Int(),
                        Accuracy = c.Int(),
                        Turnaround = c.Int(),
                        ConcernNone = c.Boolean(nullable: false),
                        ConcernOther = c.String(),
                        Fda = c.Boolean(nullable: false),
                        NonHm = c.Boolean(nullable: false),
                        RequirementNone = c.Boolean(nullable: false),
                        RequirementOther = c.String(),
                        MaximumHeat = c.String(),
                        Coa = c.Boolean(nullable: false),
                        Msds = c.Boolean(nullable: false),
                        Cie = c.Boolean(nullable: false),
                        MateriaSeet = c.Boolean(nullable: false),
                        FdaLetter = c.Boolean(nullable: false),
                        UvLetter = c.Boolean(nullable: false),
                        LogoChips = c.Boolean(nullable: false),
                        CustomerDueDate = c.DateTime(nullable: false),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Carrier_Id = c.Int(),
                        CustomerResin_Id = c.Int(),
                        CustomerShipViaAccount_Id = c.Int(),
                        Opacity_Id = c.Int(),
                        Packaging_Id = c.Int(),
                        Pellet_Id = c.Int(),
                        Product_Id = c.Int(),
                        Reformulation_Id = c.Int(),
                        TargetType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Carriers", t => t.Carrier_Id)
                .ForeignKey("dbo.CustomerResins", t => t.CustomerResin_Id)
                .ForeignKey("dbo.CustomerShipViaAccounts", t => t.CustomerShipViaAccount_Id)
                .ForeignKey("dbo.Opacities", t => t.Opacity_Id)
                .ForeignKey("dbo.Packagings", t => t.Packaging_Id)
                .ForeignKey("dbo.Pellets", t => t.Pellet_Id)
                .ForeignKey("dbo.Products", t => t.Product_Id)
                .ForeignKey("dbo.Products", t => t.Reformulation_Id)
                .ForeignKey("dbo.TargetTypes", t => t.TargetType_Id)
                .Index(t => t.Carrier_Id)
                .Index(t => t.CustomerResin_Id)
                .Index(t => t.CustomerShipViaAccount_Id)
                .Index(t => t.Opacity_Id)
                .Index(t => t.Packaging_Id)
                .Index(t => t.Pellet_Id)
                .Index(t => t.Product_Id)
                .Index(t => t.Reformulation_Id)
                .Index(t => t.TargetType_Id);
            
            CreateTable(
                "dbo.CustomerResins",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ResinType = c.String(),
                        Quantidade = c.Int(nullable: false),
                        Code = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                        Customer_Id = c.Int(),
                        UnitMeasurement_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Customers", t => t.Customer_Id)
                .ForeignKey("dbo.UnitMeasurements", t => t.UnitMeasurement_Id)
                .Index(t => t.Customer_Id)
                .Index(t => t.UnitMeasurement_Id);
            
            CreateTable(
                "dbo.UnitMeasurements",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Opacities",
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
                "dbo.Packagings",
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
                "dbo.Pellets",
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
                "dbo.TargetTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        CreationDate = c.DateTime(),
                        LastUpdate = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ColorMatchRequests", "TargetType_Id", "dbo.TargetTypes");
            DropForeignKey("dbo.ColorMatchRequests", "Reformulation_Id", "dbo.Products");
            DropForeignKey("dbo.ColorMatchRequests", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.ColorMatchRequests", "Pellet_Id", "dbo.Pellets");
            DropForeignKey("dbo.ColorMatchRequests", "Packaging_Id", "dbo.Packagings");
            DropForeignKey("dbo.ColorMatchRequests", "Opacity_Id", "dbo.Opacities");
            DropForeignKey("dbo.ColorMatchRequests", "CustomerShipViaAccount_Id", "dbo.CustomerShipViaAccounts");
            DropForeignKey("dbo.ColorMatchRequests", "CustomerResin_Id", "dbo.CustomerResins");
            DropForeignKey("dbo.CustomerResins", "UnitMeasurement_Id", "dbo.UnitMeasurements");
            DropForeignKey("dbo.CustomerResins", "Customer_Id", "dbo.Customers");
            DropForeignKey("dbo.ColorMatchRequests", "Carrier_Id", "dbo.Carriers");
            DropIndex("dbo.CustomerResins", new[] { "UnitMeasurement_Id" });
            DropIndex("dbo.CustomerResins", new[] { "Customer_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "TargetType_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Reformulation_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Product_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Pellet_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Packaging_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Opacity_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "CustomerShipViaAccount_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "CustomerResin_Id" });
            DropIndex("dbo.ColorMatchRequests", new[] { "Carrier_Id" });
            DropTable("dbo.TargetTypes");
            DropTable("dbo.Pellets");
            DropTable("dbo.Packagings");
            DropTable("dbo.Opacities");
            DropTable("dbo.UnitMeasurements");
            DropTable("dbo.CustomerResins");
            DropTable("dbo.ColorMatchRequests");
            DropTable("dbo.Carriers");
        }
    }
}
