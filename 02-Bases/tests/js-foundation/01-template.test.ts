import { emailTemplate } from '../../src/js-foundation/01-template';





describe("template", () => {


    it("emailTemplate should contain a greeting", () => {
        
        expect(emailTemplate).toContain("Hi, ")



    });

    it("emailTemplate should contain {{name}} and the {{orderId}}", () => {


        expect(emailTemplate).toMatch(/{{name}}/);
        expect(emailTemplate).toMatch(/{{orderId}}/);

    })

})