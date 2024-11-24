from setuptools import setup, find_namespace_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="karrio.generic",
    version="2024.2",
    description="Karrio - Custom carrier Shipping extension",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/karrioapi/karrio",
    author="karrio",
    author_email="hello@karrio.io",
    license="Apache-2.0",
    packages=find_namespace_packages(exclude=["tests.*", "tests"]),
    install_requires=["karrio"],
    classifiers=[
        "Intended Audience :: Developers",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
    ],
    zip_safe=False,
    include_package_data=True,
)
