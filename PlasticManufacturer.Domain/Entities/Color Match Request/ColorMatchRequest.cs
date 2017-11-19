using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Color_Match_Request
{
    public class ColorMatchRequest : Entity
    {
        [ForeignKey("Customer")]
        public int? Customer_Id { get; set; }
        public virtual Customer Customer { get; set; }

        public virtual int LoteId { get; set; }
        public virtual IList<ColorCustomerAddress> ColorCustomerAdresses { get; set; }
        public virtual string ProductDescription { get; set; }
        public virtual string ProductAplication { get; set; }
        public virtual bool PriceQuoteRequired { get; set; }

        [ForeignKey("TargetType")]
        public int? TargetType_Id { get; set; }
        public virtual TargetType TargetType { get; set; }

        public virtual string TargetTypeField { get; set; }

        [ForeignKey("Opacity")]
        public int? Opacity_Id { get; set; }
        public virtual Opacity Opacity { get; set; }

        public virtual bool SurfaceMatte { get; set; }
        public virtual bool SurfaceGlossy { get; set; }
        public virtual string SurfaceOthers { get; set; }
        public virtual string WallThickness { get; set; }
        public virtual bool Injection { get; set; }
        public virtual bool Blow { get; set; }
        public virtual bool Compression { get; set; }
        public virtual bool Extrusion { get; set; }
        public virtual bool FiberDenier { get; set; }
        public virtual bool CoEx { get; set; }

        [ForeignKey("CustomerResin")]
        public int? CustomerResin_Id { get; set; }
        public virtual CustomerResin CustomerResin { get; set; }

        public virtual string MeltIndex { get; set; }
        public virtual bool Film { get; set; }
        public virtual bool Sheet { get; set; }
        public virtual bool Rotational { get; set; }
        public virtual string Mfg { get; set; }
        public virtual bool GasAssitInjection { get; set; }
        public virtual bool Exact { get; set; }
        public virtual bool Commercial { get; set; }
        public virtual string ClosestSTD { get; set; }
        public virtual string MoreDe { get; set; }
        public virtual bool CieLab { get; set; }
        public virtual bool D65 { get; set; }
        public virtual bool Cfw { get; set; }
        public virtual bool A { get; set; }
        public virtual int ChipsQty { get; set; }
        public virtual bool TubeSample { get; set; }
        public virtual bool SheetExtrusionSample { get; set; }
        public virtual decimal RequiredCustomerQty { get; set; }
        public virtual decimal UnitQty { get; set; }

        [ForeignKey("Packaging")]
        public int? Packaging_Id { get; set; }
        public virtual Packaging Packaging { get; set; }

        [ForeignKey("Carrier")]
        public int? Carrier_Id { get; set; }
        public virtual Carrier Carrier { get; set; }


        public virtual string RequiredRatio { get; set; }

        [ForeignKey("Pellet")]
        public int? Pellet_Id { get; set; }
        public virtual Pellet Pellet { get; set; }

        //Esposure
        public virtual bool Interior { get; set; }
        public virtual bool Exterior { get; set; }
        public virtual string LightLastness { get; set; }
        public virtual DateTime? Hour { get; set; }
        //Purpose
        public virtual bool New { get; set; }

        [ForeignKey("Reformulation")]
        public int? Reformulation_Id { get; set; }
        public virtual Product Reformulation { get; set; } // Conversar com aulus na telas de onde vem esses dados.

        public virtual string Reason { get; set; }
        public virtual bool Uv { get; set; }
        public virtual string UvPackage { get; set; }
        public virtual bool IsAntiOxidant { get; set; }
        public virtual string AntiOxidant { get; set; }
        public virtual bool IsAntiStat { get; set; }
        public virtual string AntiStat { get; set; }
        public virtual bool AdditiveNone { get; set; }
        public virtual bool IsLubricant { get; set; }
        public virtual string Lubricant { get; set; }
        public virtual string Amount { get; set; }
        public virtual string AdditiveOther { get; set; }
        public virtual bool BestAdditive { get; set; }
        public virtual bool Slip { get; set; }
        public virtual int? Price { get; set; }
        public virtual int? Accuracy { get; set; }
        public virtual int? Turnaround { get; set; }
        public virtual bool ConcernNone { get; set; }
        public virtual string ConcernOther { get; set; }
        public virtual bool Fda { get; set; }
        public virtual bool NonHm { get; set; }
        public virtual bool RequirementNone { get; set; }
        public virtual string RequirementOther { get; set; }
        public virtual string MaximumHeat { get; set; }
        public virtual bool Coa { get; set; }
        public virtual bool Msds { get; set; }
        public virtual bool Cie { get; set; }
        public virtual bool MateriaSeet { get; set; }
        public virtual bool FdaLetter { get; set; }
        public virtual bool UvLetter { get; set; }
        public virtual bool LogoChips { get; set; }

        [ForeignKey("Product")]
        public int? Product_Id { get; set; }
        public virtual Product Product { get; set; }

        [ForeignKey("CustomerShipViaAccount")]
        public int? CustomerShipViaAccount_Id { get; set; }
        public virtual CustomerShipViaAccount CustomerShipViaAccount { get; set; }

        public virtual DateTime? CustomerDueDate { get; set; }
    }
}
