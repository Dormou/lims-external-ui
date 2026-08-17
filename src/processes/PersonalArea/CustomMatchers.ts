export function CustomMatchers (chai: Chai.ChaiStatic) {
  // Custom matcher for checking if a data-testid attribute exists on an element
  chai.Assertion.addMethod('toHaveDataTestId', function (dataTestId: string) {
    const subject = this._obj as Element; // Cast to Element

    if (!subject) {
      throw new Error("Subject is null or undefined");
    }

    const dataTestIdValue = subject.getAttribute('data-testid');

    const message = `Expected element to have data-testid '${dataTestId}', but got '${dataTestIdValue || 'null'}'`;

    expect(dataTestIdValue, message).to.equal(dataTestId);
  });
};