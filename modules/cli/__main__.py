from datetime import datetime
import typing
import typer
import commands.sdk as sdk
import commands.docs as docs
import commands.utils as utils

app = typer.Typer()
app.add_typer(
    docs.docs, name="docs", help="Generate documentation based on carriers metadata."
)


@app.command()
def add_extension(
    carrier_slug: str = typer.Option(..., prompt=True),
    display_name: str = typer.Option(..., prompt=True),
    features: typing.Optional[str] = typer.Option(
        ", ".join(utils.DEFAULT_FEATURES), prompt=True
    ),
    version: typing.Optional[str] = typer.Option(
        f"{datetime.now().strftime('%Y.%-m')}", prompt=True
    ),
    is_xml_api: typing.Optional[bool] = typer.Option(False, prompt="Is XML API?"),
):
    sdk.add_extension(
        carrier_slug.lower(),
        display_name,
        features,
        version,
        is_xml_api,
    )


@app.command()
def add_features(
    carrier_slug: str = typer.Option(..., prompt=True),
    display_name: str = typer.Option(..., prompt=True),
    features: typing.Optional[str] = typer.Option(
        ", ".join(utils.DEFAULT_FEATURES), prompt=True
    ),
    is_xml_api: typing.Optional[bool] = typer.Option(False, prompt="Is XML API?"),
):
    if not carrier_slug:
        print("No carrier slug provided")
        raise typer.Abort()

    sdk.add_features(
        carrier_slug.lower(),
        display_name,
        features,
        is_xml_api,
    )


@app.command()
def create_tree(
    module: str = typer.Option(..., prompt=True),
    class_name: str = typer.Option(..., prompt=True),
    module_alias: str = typer.Option("", prompt=False),
):
    if not module or not class_name:
        print("module and class_name are required")
        raise typer.Abort()

    output = utils.instantiate_class_from_module(
        module,
        class_name,
        module_alias=module_alias,
    )
    typer.echo(output)


if __name__ == "__main__":
    app()
