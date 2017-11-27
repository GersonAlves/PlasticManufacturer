using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.RawMaterial;
using PlasticManufacturer.InfraStructure.Context;
using System.Web.Http.Cors;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class RawMaterialsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/RawMaterials
        public IQueryable<RawMaterial> GetRawMateials()
        {
            return db.RawMateials;
        }

        // GET: api/RawMaterials/5
        [ResponseType(typeof(RawMaterial))]
        public async Task<IHttpActionResult> GetRawMaterial(int id)
        {
            RawMaterial rawMaterial = await db.RawMateials.FindAsync(id);
            if (rawMaterial == null)
            {
                return NotFound();
            }

            return Ok(rawMaterial);
        }

        // PUT: api/RawMaterials/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRawMaterial(int id, RawMaterial rawMaterial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != rawMaterial.Id)
            {
                return BadRequest();
            }

            db.Entry(rawMaterial).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RawMaterialExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RawMaterials
        [ResponseType(typeof(RawMaterial))]
        public async Task<IHttpActionResult> PostRawMaterial(RawMaterial rawMaterial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RawMateials.Add(rawMaterial);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = rawMaterial.Id }, rawMaterial);
        }

        // DELETE: api/RawMaterials/5
        [ResponseType(typeof(RawMaterial))]
        public async Task<IHttpActionResult> DeleteRawMaterial(int id)
        {
            RawMaterial rawMaterial = await db.RawMateials.FindAsync(id);
            if (rawMaterial == null)
            {
                return NotFound();
            }

            db.RawMateials.Remove(rawMaterial);
            await db.SaveChangesAsync();

            return Ok(rawMaterial);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RawMaterialExists(int id)
        {
            return db.RawMateials.Count(e => e.Id == id) > 0;
        }
    }
}